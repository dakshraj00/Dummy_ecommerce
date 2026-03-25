from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph
from dotenv import load_dotenv
import os
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage
from .tools import (get_cancellation,get_summary,get_incident)
from langchain_core.messages import SystemMessage ,HumanMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.prebuilt import ToolNode,tools_condition
load_dotenv()
from datetime import datetime

curr_year=datetime.now().year
curr_month=datetime.now().month
class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

llm=ChatOpenAI(temperature=0)
checkpointer=InMemorySaver()
tools=[get_cancellation,get_summary,get_incident]
tool_node = ToolNode(tools)

llm_with_tools=llm.bind_tools(tools)

system_prompt=SystemMessage(
    content=(
    "You are an AI Operational Intelligence Assistant for an e-commerce system. "
    "Your job is to answer business and operational questions about orders and incidents. "

    "Always use available tools whenever data is required. "
    "Never guess or invent numbers. "
    "Always rely on the tool output as the source of truth. "

    "If the tool returns no incidents or an empty result, clearly state that no incidents or unusual activity were recorded for that period. "

    "After receiving tool results, summarize the information clearly including totals, counts, and breakdowns if available. "

    "All answers must be returned in a single line without newline characters. "

    f"If the user mentions a month without specifying the year, assume the year is {curr_year}. "
    f"If the user asks about the current month, assume month {curr_month} and year {curr_year} unless stated otherwise."
    )

)

def chatbot(state:State):
    messages=[system_prompt]+state['messages']
    response=llm_with_tools.invoke(messages)

    return {'messages':response}

graph=StateGraph(State)
graph.add_node('chatnode',chatbot)
graph.add_node('tools',tool_node)
graph.set_entry_point('chatnode')
graph.add_conditional_edges('chatnode',tools_condition)
graph.add_edge('tools',"chatnode")
app=graph.compile(checkpointer=checkpointer)
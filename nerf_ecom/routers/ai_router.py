from fastapi import APIRouter
from ai_chatbot.ai_agent import app
from pydantic import BaseModel
from langchain.messages import SystemMessage,HumanMessage
chat_router=APIRouter()


class QueryRequest(BaseModel):
    question: str

@chat_router.post("/ai/query")
def query_ai(request:QueryRequest):
    response=app.invoke(
        {
            'messages':[HumanMessage(content=request.question)]
        },
        config={"configurable": {"thread_id": "user_1"}}
    )

    return {
        'answer':response['messages'][-1].content
    }



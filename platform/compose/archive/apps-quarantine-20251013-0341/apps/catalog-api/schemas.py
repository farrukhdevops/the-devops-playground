from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    description: str | None = None

class ProductOut(BaseModel):
    id: int
    name: str
    description: str | None = None
    # Pydantic v2: enable reading from SQLAlchemy ORM objects
    model_config = {"from_attributes": True}

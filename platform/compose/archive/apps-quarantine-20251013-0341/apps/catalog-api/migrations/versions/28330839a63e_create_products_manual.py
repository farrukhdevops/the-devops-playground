"""create products (manual v2)"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '28330839a63e'
down_revision: str | None = '0d0a5c471519'
branch_labels: str | None = None
depends_on: str | None = None



# Alembic fills these identifiers in the generated file header; keep them as-is.

def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.String(length=1024), nullable=True),
    )
    # unique index on name
    op.create_index("ux_products_name", "products", ["name"], unique=True)

def downgrade() -> None:
    op.drop_index("ux_products_name", table_name="products")
    op.drop_table("products")

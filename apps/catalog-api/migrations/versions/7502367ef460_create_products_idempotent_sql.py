"""create products (idempotent SQL)

Revision ID: 7502367ef460
Revises: 9e5fd3e24bce
Create Date: 2025-10-04 15:25:40.568879

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7502367ef460'
down_revision: Union[str, Sequence[str], None] = '9e5fd3e24bce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

"""create products (final)

Revision ID: 9e5fd3e24bce
Revises: 28330839a63e
Create Date: 2025-10-04 15:23:41.592372

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9e5fd3e24bce'
down_revision: Union[str, Sequence[str], None] = '28330839a63e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

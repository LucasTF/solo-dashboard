"""Arquivo Table

Revision ID: 9236c4a2d203
Revises: 735ad222e291
Create Date: 2024-10-22 17:06:15.509051

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9236c4a2d203'
down_revision: Union[str, None] = '735ad222e291'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Arquivo',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('obra_id', sa.Integer(), nullable=False),
    sa.Column('nome', sa.String(length=80), nullable=False),
    sa.Column('formato', sa.String(length=5), nullable=False),
    sa.Column('criado_em', sa.DateTime(), nullable=False),
    sa.Column('tipo', sa.String(length=40), nullable=False),
    sa.Column('caminho', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['obra_id'], ['Obra.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Arquivo_formato'), 'Arquivo', ['formato'], unique=False)
    op.create_index(op.f('ix_Arquivo_nome'), 'Arquivo', ['nome'], unique=False)
    op.create_index(op.f('ix_Arquivo_tipo'), 'Arquivo', ['tipo'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_Arquivo_tipo'), table_name='Arquivo')
    op.drop_index(op.f('ix_Arquivo_nome'), table_name='Arquivo')
    op.drop_index(op.f('ix_Arquivo_formato'), table_name='Arquivo')
    op.drop_table('Arquivo')
    # ### end Alembic commands ###

import os

from app import app
from lib.config import CONFIG
from lib.models import db, User, Article
from datetime import datetime, timedelta


def setup_db():
    if 'production' in os.getenv('APP_SETTINGS', '').lower() or CONFIG.ENVIRONMENT == 'production':
        app.logger.error('restore_staging_dataset cannot be used in production env!!!')
        exit()

    with app.app_context():
        db.drop_all()
        db.create_all()

        user = User(username='test', password='test')
        db.session.add(user)
        db.session.flush()  # required to create user_id

        db.session.add(Article(
            author_user_id=user.user_id,
            title='Article title',
            content='No Pulitzer candidate here, lets focus on the code.'
        ))
        db.session.add(Article(
            author_user_id=user.user_id,
            title='Article title1',
            content='No Pulitzer candidate here, lets focus on the code1.',
            release_date = datetime.utcnow() - timedelta(365)
        ))
        db.session.add(Article(
            author_user_id=user.user_id,
            title='Article title2',
            content='No Pulitzer candidate here, lets focus on the code2.',
            release_date=datetime.utcnow() - timedelta(365*2)
        ))
        db.session.add(Article(
            author_user_id=user.user_id,
            title='Article title3',
            content='No Pulitzer candidate here, lets focus on the code3.',
            release_date=datetime.utcnow() - timedelta(365*3)
        ))
        db.session.add(Article(
            author_user_id=user.user_id,
            title='Article title4',
            content='No Pulitzer candidate here, lets focus on the code4.',
            release_date=datetime.utcnow() - timedelta(365*4)
        ))

        db.session.commit()


if __name__ == '__main__':
    setup_db()

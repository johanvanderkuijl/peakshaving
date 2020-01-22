import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./peakshaving-2ab48-firebase-adminsdk-zrzq6-4fe5809bbe.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# use the collection 'measurements'
doc_ref = db.collection(u'measurements').document()

# and create a new document
doc_ref.set({
    u'meta': {
        u'version': 1,
        u'source': u'app.py',
        u'developer': u'johan'
    },
    u'EAN': u'EAN12345678',
    u'U_1': 230,
    u'U_2': 230,
    u'U_3': 230,
    u'I_1': 15,
    u'I_2': 8,
    u'I_3': 7,
    u'IZ_1': 0,
    u'IZ_2': 0,
    u'IZ_3': 0
})

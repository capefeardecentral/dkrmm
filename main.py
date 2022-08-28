import api
import os

a = api.API()

if os.getenv('PRODUCTION', 'false').lower() == 'true':
    a.app.run(host='0.0.0.0')
else:
    a.app.run(host='0.0.0.0', debug=True)

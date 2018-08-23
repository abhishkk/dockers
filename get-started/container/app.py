from flask import Flask
from redis import Redis, RedisError
import os
import socket

# Connect to redis db
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

# Create a flask web app
app = Flask(__name__)

# Routes for app
@app.route("/")
def hello():
	try:
		# Increase the counter in redis db.
		visits = redis.incr("counter")
	except RedisError:
		# In case of redis db connection issue, output error.
		visits = "<i>cannot connect to Redis, counter disabled</i>"

	html = "<h3>Hello {name}!</h3>" \
	       "<b>Hostname:</b> {hostname}<br/>" \
	       "<b>Visits:</b> {visits}"

  # While building image we have set the env variable for name as world.
	return html.format(name=os.getenv("NAME", "nameNotFoundInEnvVar"), hostname=socket.gethostname(), visits=visits)

if __name__ == "__main__":
	# Start the flask app on 0.0.0.0 IP on port 80.
	app.run(host='0.0.0.0', port=80)
"""Re-authenticate GSC token for bonuskarte.digital.
Reads client_id and client_secret from the existing token file."""
import json
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow

TOKEN_PATH = Path.home() / ".config/google-oauth-tokens/bonuskarte-gsc.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

existing = json.loads(TOKEN_PATH.read_text())
CLIENT_CONFIG = {
    "installed": {
        "client_id": existing["client_id"],
        "client_secret": existing["client_secret"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": ["http://localhost"]
    }
}

flow = InstalledAppFlow.from_client_config(CLIENT_CONFIG, SCOPES)
creds = flow.run_local_server(port=0)

TOKEN_PATH.write_text(creds.to_json())
print(f"Token gespeichert: {TOKEN_PATH}")

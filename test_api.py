import requests
import json

BASE_URL = "http://localhost:8000"

def test_signup():
    print("Testing signup...")
    signup_data = {
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    }
    
    response = requests.post(f"{BASE_URL}/auth/signup", json=signup_data)
    print(f"Signup response: {response.status_code}")
    if response.status_code == 200:
        print(f"Signup data: {response.json()}")
    else:
        print(f"Signup error: {response.text}")

def test_login():
    print("\nTesting login...")
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login response: {response.status_code}")
    if response.status_code == 200:
        print(f"Login data: {response.json()}")
        return response.json().get("access_token")
    else:
        print(f"Login error: {response.text}")
        return None

def test_get_me(token):
    print("\nTesting get user details...")
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Get me response: {response.status_code}")
    if response.status_code == 200:
        print(f"User details: {response.json()}")
    else:
        print(f"Get me error: {response.text}")

if __name__ == "__main__":
    test_signup()
    token = test_login()
    if token:
        test_get_me(token)
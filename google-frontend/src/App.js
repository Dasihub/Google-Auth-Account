import React from "react";
import GoogleLogin from "react-google-login";
import {Image, Button} from 'antd'
import {keyGoogleAccount} from "./config/data";

function App() {
    const [loginData, setLoginData] = React.useState(
        localStorage.getItem('loginData') ?
            JSON.parse(localStorage.getItem('loginData'))
            : null
    )

    const handleFailure = (result) => {
        console.log(result, 'result')
    }

    const handleLogout = () => {
        localStorage.removeItem('loginData')
        setLoginData(pre => pre = null)
    }

    const handleLogin = async (googleData) => {
        try {
            const res = await fetch('/api/google-login', {
                method: 'POST',
                body: JSON.stringify({
                    token: googleData.tokenId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()
            setLoginData(pre => pre = data)
            localStorage.setItem('loginData', JSON.stringify(data))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="_container">
            {
                loginData ? (
                        <div style={{textAlign: 'center'}}>
                            <Image
                                width={200}
                                src={loginData.picture}
                            />
                            <h3 className="about">{loginData.email}</h3>
                            <Button type="primary" onClick={handleLogout}>Выйти</Button>
                        </div>
                    )
                    :
                    (
                        <GoogleLogin
                            clientId={keyGoogleAccount}
                            buttonText="Войти"
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    )
            }
        </div>
    )
}

export default App
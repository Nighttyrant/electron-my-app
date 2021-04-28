import logo from './logo.svg';
import './App.css';
import {ipcRenderer} from 'electron'
import React, {useState, useEffect} from 'react';

function App () {
    //要去控制的控制码
    const [remoteCode, setRemoteCode] = useState('');
    //本身的控制码
    const [localCode, setLocalCode] = useState('')
    //控制状态的文案
    const [controlText, setControlText] = useState('');

    const login = async () => {
        //向主程序发送登录请求，获得本机的控制码
        let code = await ipcRenderer.invoke('login')
        setLocalCode(code)
    }

    const startControl = (remoteCode) => {
        console.log(remoteCode)
        ipcRenderer.send('control', remoteCode)
    }

    const handleControlState = (e, name, type) => {
        let text = ''
        if (type === 1) {
            text = `正在远程控制${name}`
        } else if (type === 2) {
            text = `被${name}控制中`
        } else {
            text = ''
        }
        setControlText(text)
    }
    useEffect(() => {
        login()
        ipcRenderer.on('control-state-change', handleControlState)
        return () => {
            ipcRenderer.removeListener('control-state-change', handleControlState)
        }
    }, [])

    return (
        <div className="App">
            {
                controlText === '' ? <>
                    <div>你的控制码{localCode}</div>
                    <input type="text" value={remoteCode} onChange={(e) => setRemoteCode(e.target.value)}/>
                    <button onClick={() => {
                        startControl(remoteCode)
                    }}>确认
                    </button>
                </> : <div>{controlText}</div>
            }
        </div>
    );
}

export default App;

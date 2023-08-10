import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import './style.css'


function Home(){
    const [data, setData] = useState({
        celcius:10,
        name:'London',
        humidity: 10,
        speed:2,
        image:'/images/clouds.png'
    })
const [name, setName] = useState('');
const [error, setError] = useState('');



    // useEffect(()=>{
    //     const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=sokcho-si&appid=ec92f4057bdcdfd2bb675a00de5463b6&units=metric"
    //     axios.get(apiUrl)
    //     .then(res=>{
    //         setData({...data, celcius:res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed})
    //     })
    //     .catch(err => console.log(err));
    // },[])


    const handleClick = ()=>{
        if(name!==""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ec92f4057bdcdfd2bb675a00de5463b6&units=metric`;
            axios.get(apiUrl)
            .then(res=>{
                let imagePath = '';
                if(res.data.weather[0].main=="clouds"){
                    imagePath = "/images/clouds.png"
                }
                else if(res.data.weather[0].main=="Clear"){
                    imagePath="/images/sunny.png"
                }else if(res.data.weather[0].main=="Rain"){
                    imagePath = "/images/raining.png"
                }else if(res.data.weather[0].main=="Drizzle"){
                    imagePath = "/images/drizzle.png"
                }else if (res.data.weather[0].main=="Mist"){
                    imagePath = "/images/mist.png"
                }else{
                    imagePath = "/images/clouds.png"
                }
                    
                
                setData({...data, celcius:res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed, image:imagePath})
                setError('');
            })
            .catch(err => {
                if(err.response.status == 404){
                    setError("invalid City Name")
                }else{
                    setError('')
                }
                console.log(err)
            });

        }
    }
    return(
        <div className='container'>
            <div className = 'weather'>
                <div className = 'search'>
                    <input type = "text" placeholder='Enter City Name' onChange={e=>setName(e.target.value)}/>
                    <button><img src = "/images/search.png" onClick={handleClick} alt = ""/></button>
                </div>
                <div className = "winfo">
                    <div className="error">
                        <p>{error}</p>
                    </div>
                    <img src = {data.image} alt= "kiran" className='clouds'/>
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src = "/images/humidity.png" alt = ""/>
                            <div className = "humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src = "/images/wind.png" alt = ""/>
                            <div className= "wind">
                                <p>{Math.round(data.speed)}km/hr</p>
                                <p>wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
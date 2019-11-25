import React from 'react';
import Chart from '../../Components/Chart'
const axios = require('axios');

function Page() {
  const [data,setData] = React.useState([]);

  const [error, setError] = React.useState('')

  const [margin,setMargin] = React.useState({
    min: 15,
    max: 20
  });

  const [time, setTime] = React.useState(`${new Date()}`);
  const [rele, setRele] = React.useState(true);
  const [realRele, setRealRele] = React.useState(true);
  const [stop, setStop] = React.useState(false);
  const [temperatura, setTemperatura] = React.useState(50);
  const [x, setX] = React.useState();
  
  const updateMargin = (tipo) => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setMargin(old => ({...old, [tipo]: value}));
  }

  async function setState() {
    if (!stop) {
      await axios.get("/getTemperature")
      .then(res => {
        const temp = Number(res.data.temperatura);
        setTemperatura(temp);
        setRealRele(res.data.rele);
        setData(old => [...old, {"temp": temp, "time": `${old.length}s`}]);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  async function setLimits() {
    await axios.post(`/setLimits?min=${margin.min}&max=${margin.max}`)
    .catch(err => console.log(err))
  }

  async function turnOn() {
    await axios.post(`/turnOn`)
    .then(res => setRealRele(true))
    .catch(err => console.log(err))
  }

  async function turnOff() {
    await axios.post(`/turnOff`)
    .then(res => setRealRele(false))
    .catch(err => console.log(err))
  }

  React.useEffect(() => {
    if (localStorage.getItem("logado") !== "true") {
      window.location = "/"
    }

    setX(setInterval(function() {
      setTime(`${new Date()}`);
      setState();
    }, 900));
  }, [stop]);

  return (
    <div className="row h-100 m-0">
      <div className="col-sm-3">
        <div className="mt-3 mb-3 p-4 border-radius-3 bg-dark text-white" style={{height: "calc(100% - 2rem)"}}>
          <h4 className="text-center mb-4">Configurações</h4>
          <label htmlFor="customRange1">Temperatura mínima</label>
          <input
            type="range"
            className="custom-range"
            style={{width: '80%'}}
            id="customRange1"
            min={-55}
            max={150}
            defaultValue={margin.min}
            onChange={updateMargin('min')} />
            <p className='float-right'>{`${margin.min} °C`}</p>

          <label htmlFor="customRange2">Temperatura máxima</label>
          <input
            type="range"
            className="custom-range"
            style={{width: '80%'}}
            id="customRange2"
            min={-55}
            max={150}
            defaultValue={margin.max}
            onChange={updateMargin('max')}
            /><p className='float-right'>{`${margin.max} °C`}</p>

          <div className="clearfix mt-4">
            <p className="float-left mt-1 mb-1">Relé</p>
            <button
            className={`btn float-right btn-${rele ? 'success' : 'danger' }`}
            style={{width: '60px'}}
            onClick={() => setRele(!rele)}
          >{rele ? 'On' : 'Off' }</button>
          </div>
            
          <button
            className="btn btn-light w-100 mt-4"
            onClick={() => {
              if (!(margin.max > margin.min)) {
                setError("A margem de valores selecionadas é inválida!");
              } else {
                setError("");
                setLimits();
                if (rele && !realRele) {
                  turnOn();
                } else if (!rele && realRele) {
                  turnOff();
                }
              }
            }}
          >
            Aplicar Alterações
          </button>
          <button
            className="btn btn-light w-100 mt-4"
            onClick={() => {
              localStorage.setItem("logado", "false");
              window.location = "/"
            }}
          >
            Sair
          </button>
          <p className="text-warning" style={{
            textJustify: 'true'
          }}>{error}</p>
        </div>
      </div>
      <div className="col-sm-9">
        <div className="mt-3 mb-3 p-4 border-radius-3 bg-white" style={{height: "calc(100% - 2rem)"}}>
          <h2 className="text-center mb-2">Dashboard</h2>
          <h4>Temperatura: {temperatura} °C</h4>
          <h4 className="mb-4">Relé: {setRele ? 'Ligado' : 'Desligado'}</h4>
            <div className="w-100">
              <div className="centered h-fill">
                {data.length !== 0 ?
                <Chart data={data} /> : ""}
              </div>
              <p>{time}</p>
              <button
              className={`btn btn-${stop ? "success" : "danger"}`}
              onClick={() => {
                setStop(!stop);
                clearInterval(x);
              }}>
                {stop ? "Continue" : "Stop" }
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
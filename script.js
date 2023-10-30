

const search = document.querySelector('#search')
const input = document.querySelector('#input')
const iconTempo = document.querySelector('#iconTempo')
const dadoCidade = document.querySelector('#dadoCidade')
const fraseTempo = document.querySelector('#fraseTempo')
const dadoTemperatura = document.querySelector('#dadoTemperatura')
const dadoHumidade = document.querySelector('#dadoHumidade')
const dadoVento = document.querySelector('#dadoVento')
const conteinerDados = document.querySelector('#conteinerDados')

const requisiçao = async () => {
    
    const city = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=95de874bc19ecebb6a2441f0afdcacdd&lang=pt_br`
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(res.status)
        }
        
        const data = await res.json()
        return data;

    } catch(error) {
        alert('Erro! Por favor, cheque os dados e tente novamente!')
    }
}


const construtor = async () => {
    const data = await requisiçao()

    dadoCidade.innerHTML = data.name
    dadoTemperatura.innerHTML = parseInt(data.main.temp)
    dadoHumidade.innerHTML = data.main.humidity + '%'
    dadoVento.innerHTML = parseInt(data.wind.speed) + 'km/h'
    iconTempo.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    fraseTempo.innerHTML = data.weather[0].description
    conteinerDados.style.display = 'block'
}



search.addEventListener('click', (e) => {
    e.preventDefault()
    construtor()
    input.value = ''
    input.focus()
})
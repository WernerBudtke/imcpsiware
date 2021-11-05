import { useState } from "react"
const initState = {
    name: '',
    height: '',
    age: '',
    weight: ''
}
const Main = () => {
    const [newPerson, setNewPerson] = useState(initState)
    const [imcResult, setImcResult] = useState(null)
    const inputHandler = (e) => {
        imcResult !== null && setImcResult(null)
        setNewPerson({
            ...newPerson,
            [e.target.name] : e.target.value
        })
    }
    const calculateImc = (weight, height) => parseFloat(weight) / (parseFloat(height) ** 2)
    const submitHandler = (e) => {
        e.preventDefault()
        const {weight, height, name} = newPerson
        let imc = calculateImc(weight, height)
        let personStatus = ""
        switch (true) {
            case imc > 25 :
                personStatus = "sobre peso"
                break
            case imc < 20 :
                personStatus = "bajo peso"
                break
            case (imc >= 20 && imc <= 25) : 
                personStatus = "peso ideal"
                break
            default:
                break
        }
        personStatus !== "" && setImcResult(`${name}, tenés ${personStatus}.`)
        setNewPerson(initState)
    }
    return (
        <main>
            <div>
                <h3>Calculo de Indice de Masa Corporal</h3>
                <form>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name" placeholder="Nombre" onChange={inputHandler} value={newPerson.name} minLength={2} maxLength={20} />
                    </div>
                    <div>
                        <label htmlFor="height">Estatura</label>
                        <input type="text" name="height" id="height" placeholder="Altura" onChange={inputHandler} value={newPerson.height}  minLength={1} maxLength={4} />
                    </div>
                    <div>
                        <label htmlFor="age">Edad</label>
                        <input type="text" name="age" id="age" placeholder="Edad" onChange={inputHandler} value={newPerson.age} minLength={1} maxLength={3} />
                    </div>
                    <div>
                        <label htmlFor="weight">Peso</label>
                        <input type="text" name="weight" id="weight" placeholder="Peso" onChange={inputHandler} value={newPerson.weight} minLength={1} maxLength={3}/>
                    </div>
                    <button onClick={submitHandler}>Calcular IMC</button>
                </form>
            </div>
            {imcResult && 
            <div id="imcResultContainer">
                <h3>Resultado IMC</h3>
                <p>{imcResult}</p>
            </div>}
        </main>
    )
}
export default Main
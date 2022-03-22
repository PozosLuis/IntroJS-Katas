const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) =>{
        if(res.status != "200") {
            console.log(res);
            pokeImage("./pokebola.png");
        } else {
            return res.json();
        } 
    }).then((data) => {
        console.log(data);
        limpiarInputs("pokeName");
        numInputsCtg=document.querySelectorAll(`.ctg-Poke`).length;
        numInputsHab=document.querySelectorAll(`.hab-Poke`).length;
        for (let index = 0; index < numInputsCtg; index++) {
            delInput("ctg-Poke");
        }
        for (let index = 0; index < numInputsHab; index++) {
            delInput("hab-Poke");
        }
        let pokeImg = data.sprites.front_default;
        let naPoke = data.species.name;
        let numPoke = data.id;
        let altura = data.height;
        let peso = data.weight;
        let categoria = data.types;
        var divCtg = document.getElementById("ctgPoke");
        let habilidad = data.abilities;
        var divHab = document.getElementById("habPoke");
        let statPoke = data.stats;
        let movesAll = data.moves;
        actualizarTextarea("p-move");
        for (let index = 0; index < categoria.length; index++) {
            let ctg=data.types[index].type.name
            var input = document.createElement("input");
            input.setAttribute('type', 'text');
            input.setAttribute('class', 'ctg-Poke');
            input.setAttribute('id', 'ctg-Poke');
            input.setAttribute('value', `${ctg}`);
            divCtg.appendChild(input);
        }
        for (let index = 0; index < habilidad.length; index++) {
            let hab=data.abilities[index].ability.name;
            var input = document.createElement("input");
            input.setAttribute('type', 'text');
            input.setAttribute('class', 'hab-Poke');
            input.setAttribute('id', 'hab-Poke');
            input.setAttribute('value', `${hab}`);
            divHab.appendChild(input);
        }
        for (let index = 0; index < statPoke.length; index++) {
            let statName = data.stats[index].stat.name;
            let statValue = data.stats[index].base_stat;
            let inputNum = document.querySelectorAll(".stat-Poke");
            for (let j = index; j < inputNum.length; j++) {
                let inputName = inputNum[j].id;
                if (inputName == statName) {
                    document.querySelector(`#${inputName.toString()}`).value = `${statValue}`;
                }
            }
        }
        pokeImage(pokeImg);
        espPoke(naPoke,numPoke,altura,peso);
        for (let index = 0; index < movesAll.length; index++){
            let nextMove = data.moves[index].move.name;
            document.querySelector('#p-move').append((index+1)+". "+nextMove + "\n\n");
        }
    })
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const espPoke = (name,num,alt,pes) => {
    document.querySelector('#namePoke').innerText = name.toUpperCase();
    if (num >= 100) {
        document.querySelector('#nPoke').innerText = '#'+num;
    }else{
        if (num > 9 && num < 100) {
            document.querySelector('#nPoke').innerText = '#0'+num;
        }else{
            document.querySelector('#nPoke').innerText = '#00'+num;
        }
    }
    document.querySelector('#altura').value = alt/10 + ' m';
    document.querySelector('#peso').value = pes/10 + ' kg';
}

const delInput = (idInput) => {
    var ctgInput = document.getElementById(idInput);
    ctgInput.remove();
}

const limpiarInputs = (input) => {
    document.getElementById(`${input}`).value = "";
}

const actualizarTextarea = (ta) => {
    console.log("object");
    document.getElementById(ta).innerHTML=("");
}
function calcularPrecos() {
    const idade = parseInt(document.getElementById("idade").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value) / 100; // converter altura para metros
    
    if (isNaN(idade) || isNaN(peso) || isNaN(altura)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    
    const imc = peso / (altura * altura);
    
    const precoA = calcularPrecoOperadoraA(idade, imc);
    const precoB = calcularPrecoOperadoraB(idade, imc);
    
    exibirResultados(precoA, precoB);
  }
  
  function calcularPrecoOperadoraA(idade, imc) {
    const planoBasico = 100 + (idade * 10 * (imc / 10));
    const planoStandard = (150 + (idade * 15)) * (imc / 10);
    const planoPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);
    
    return {
      basico: planoBasico.toFixed(2),
      standard: planoStandard.toFixed(2),
      premium: planoPremium.toFixed(2)
    };
  }
  
  function calcularPrecoOperadoraB(idade, imc) {
    let fatorComorbidade = 0;
    
    if (imc < 18.5) {
      fatorComorbidade = 10;
    } else if (imc >= 18.6 && imc < 24.9) {
      fatorComorbidade = 1;
    } else if (imc >= 25 && imc < 29.9) {
      fatorComorbidade = 6;
    } else if (imc >= 30 && imc < 34.9) {
      fatorComorbidade = 10;
    } else if (imc >= 35 && imc < 39.9) {
      fatorComorbidade = 20;
    } else if (imc >= 40) {
      fatorComorbidade = 30;
    }
    
    const planoBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
    const planoStandard = (150 + (fatorComorbidade * 15)) * (imc / 10);
    const planoPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);
    
    return {
      basico: planoBasico.toFixed(2),
      standard: planoStandard.toFixed(2),
      premium: planoPremium.toFixed(2)
    };
  }
  function exibirResultados(precoA, precoB) {
    const tabela = document.getElementById("resultado");
    
    // Limpar resultados anteriores
    while (tabela.rows.length > 1) {
      tabela.deleteRow(1);
    }
    
    // Adicionar resultados da operadora A
    const rowA = tabela.insertRow();
    const cellOperadoraA = rowA.insertCell();
    const cellPlanoA = rowA.insertCell();
    const cellPrecoA = rowA.insertCell();
    
    cellOperadoraA.textContent = "Operadora A";
    cellPlanoA.textContent = "Plano";
    cellPrecoA.textContent = "Preço";
    
    const planosA = Object.keys(precoA);
    planosA.forEach(plano => {
      const row = tabela.insertRow();
      const cellPlano = row.insertCell();
      const cellPreco = row.insertCell();
      
      cellPlano.textContent = plano;
      cellPreco.textContent = precoA[plano];
    });
    
    // Adicionar resultados da operadora B
    const rowB = tabela.insertRow();
    const cellOperadoraB = rowB.insertCell();
    const cellPlanoB = rowB.insertCell();
    const cellPrecoB = rowB.insertCell();
    
    cellOperadoraB.textContent = "Operadora B";
    cellPlanoB.textContent = "Plano";
    cellPrecoB.textContent = "Preço";
    
    const planosB = Object.keys(precoB);
    planosB.forEach(plano => {
      const row = tabela.insertRow();
      const cellPlano = row.insertCell();
      const cellPreco = row.insertCell();
      
      cellPlano.textContent = plano;
      cellPreco.textContent = precoB[plano];
    });
  }
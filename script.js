function calculateEITC() {
    const filingStatus = document.getElementById('filing-status').value;
    let numChildren = parseInt(document.getElementById('num-children').value);
    const earnedIncome = parseFloat(document.getElementById('earned-income').value);

    if (numChildren < 0) {
        numChildren = 0;
    } else if (numChildren > 3) {
        numChildren = 3;
    }

    const eitcParameters = {
        'single': {
            0: {'credit_rate': 0.0765, 'max_credit': 632, 'earned_income_threshold': 8260, 'phaseout_threshold': 10330, 'phaseout_rate': 0.0765},
            1: {'credit_rate': 0.34, 'max_credit': 4213, 'earned_income_threshold': 12390, 'phaseout_threshold': 22720, 'phaseout_rate': 0.1598},
            2: {'credit_rate': 0.40, 'max_credit': 6960, 'earned_income_threshold': 17400, 'phaseout_threshold': 22720, 'phaseout_rate': 0.2106},
            3: {'credit_rate': 0.45, 'max_credit': 7830, 'earned_income_threshold': 17400, 'phaseout_threshold': 22720, 'phaseout_rate': 0.2106},
        },
        'married': {
            0: {'credit_rate': 0.0765, 'max_credit': 632, 'earned_income_threshold': 8260, 'phaseout_threshold': 17250, 'phaseout_rate': 0.0765},
            1: {'credit_rate': 0.34, 'max_credit': 4213, 'earned_income_threshold': 11740, 'phaseout_threshold': 29640, 'phaseout_rate': 0.2106},
            2: {'credit_rate': 0.40, 'max_credit': 6960, 'earned_income_threshold': 17400, 'phaseout_threshold': 29640, 'phaseout_rate': 0.2106},
            3: {'credit_rate': 0.45, 'max_credit': 7830, 'earned_income_threshold': 17400, 'phaseout_threshold': 29640, 'phaseout_rate': 0.2106},
        }
    };

    const params = eitcParameters[filingStatus][numChildren];
    let eitc;

    if (earnedIncome <= params['earned_income_threshold']) {
        eitc = params['credit_rate'] * earnedIncome;
    } else if (earnedIncome <= params['phaseout_threshold']) {
        eitc = params['max_credit'];
    } else {
        const phaseoutAmount = earnedIncome - params['phaseout_threshold'];
        eitc = Math.max(0, params['max_credit'] - params['phaseout_rate'] * phaseoutAmount);
    }

    if (numChildren == 0){
      state_ctc=0;    
    } else {
      state_ctc=eitc*0.2*0.2;  
    }
 
  const roundedIncome = Math.round(earnedIncome);
  const formattedIncome = roundedIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0  });
  document.getElementById('result').innerHTML = `For a ${filingStatus} tax filer with ${numChildren} children making ${formattedIncome}, the expected child tax credit in Illinois for 2024 would be:<br><br> <b style="font-size:1.2em">$${state_ctc.toFixed(2)}</b><br><br> The child tax credit is expected to roughly double in tax year 2025.`;

    document.getElementById('eitc-form').style.display = 'none';
    document.getElementById('form-title').style.display = 'none';
    document.getElementById('result-page').style.display = 'flex';
}

function resetForm() {
    document.getElementById('eitc-form').reset();
    document.getElementById('result').textContent = '';
    document.getElementById('eitc-form').style.display = 'flex';
    document.getElementById('form-title').style.display = 'block';
    document.getElementById('result-page').style.display = 'none';
}

function showDisclaimer() {
    document.getElementById('disclaimer-modal').style.display = 'block';
}

function closeDisclaimer() {
    document.getElementById('disclaimer-modal').style.display = 'none';
}

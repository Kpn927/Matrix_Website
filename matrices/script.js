class MatrizHandler{
    constructor() {
        this.matriz1 = [];
        this.matriz2 = [];
    }

    // INGRESAR //
    ingresarMatriz(matrizNum) {

        // El 10 en parseINT es para definir la báse númerica que se va a utilizar, ya sea binario (2), hexadecimal (16) o Decimal (10)
        const filas = parseFloat(document.getElementById(`filas${matrizNum}`).value, 10);
        const columnas = parseFloat(document.getElementById(`columnas${matrizNum}`).value, 10);
        if (!filas || !columnas) {
            alert("Por favor, ingresa las medidas.");
            return;
        }
        let matriz = [];

        for (let i = 0; i < filas; i++) {
            let fila = prompt(`Introduce los elementos de la fila ${i + 1} para la matriz ${matrizNum}, separados por comas:`);
            let elementos = fila.split(',').map(Number);
            if (elementos.length !== columnas) {
                alert(`Por favor, introduce exactamente ${columnas} elementos.`);
                i--;
            } else {
                matriz.push(elementos);
            }
        }

        if (matrizNum === 1) {
            this.matriz1 = matriz;
            this.visualizarMatriz(this.matriz1, 'matrixTable1');
        } else if (matrizNum === 2) {
            this.matriz2 = matriz;
            this.visualizarMatriz(this.matriz2, 'matrixTable2');
        }
    }

    // VISUALIZAR //
    visualizarMatriz(matriz, tableId) {
        const table = document.getElementById(tableId);

        // Limpia la tabla antes de agregar nuevos elementos
        table.innerHTML = '';

        // Crea las filas y celdas de la tabla
        matriz.forEach((row) => {
            const tr = document.createElement('tr');
            row.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    // SUMAR //
    sumarMatrices() {
        if (this.matriz1.length === 0 || this.matriz2.length === 0) {
            alert('Por favor, ingresa ambas matrices primero.');
            return;
        }

        if (this.matriz1.length !== this.matriz2.length || this.matriz1[0].length !== this.matriz2[0].length) {
            alert('Las matrices deben tener las mismas dimensiones.');
            return;
        }

        let resultado = [];
        for (let i = 0; i < this.matriz1.length; i++) {
            let fila = [];
            for (let j = 0; j < this.matriz1[i].length; j++) {
                fila.push(this.matriz1[i][j] + this.matriz2[i][j]);
            }
            resultado.push(fila);
        }

        this.visualizarMatriz(resultado, 'resultTable');
    }

    // RESTAR ///
    restarMatrices() {
        if (this.matriz1.length === 0 || this.matriz2.length === 0) {
            alert('Por favor, ingresa ambas matrices primero.');
            return;
        }

        if (this.matriz1.length !== this.matriz2.length || this.matriz1[0].length !== this.matriz2[0].length) {
            alert('Las matrices deben tener las mismas dimensiones.');
            return;
        }

        let resultado = [];
        for (let i = 0; i < this.matriz1.length; i++) {
            let fila = [];
            for (let j = 0; j < this.matriz1[i].length; j++) {
                fila.push(this.matriz1[i][j] - this.matriz2[i][j]);
            }
            resultado.push(fila);
        }

        this.visualizarMatriz(resultado, 'resultTable');
    }


    // MULTIPLICAR //
    multiplicarMatrices() {
        if (this.matriz1.length === 0 || this.matriz2.length === 0) {
            alert('Por favor, ingresa ambas matrices primero.');
            return;
        }

        if (this.matriz1[0].length !== this.matriz2.length) {
            alert('El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.');
            return;
        }

        let resultado = [];
        for (let i = 0; i < this.matriz1.length; i++) {
            let fila = [];
            for (let j = 0; j < this.matriz2[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < this.matriz1[0].length; k++) {
                    sum += this.matriz1[i][k] * this.matriz2[k][j];
                }
                fila.push(sum);
            }
            resultado.push(fila);
        }

        this.visualizarMatriz(resultado, 'resultTable');
    }

    // INVERSA //
    obtenerInversa(matriz) {

        if (this.matriz1.length === 0 && this.matriz2.length === 0) {
            alert('Por favor, ingresa una matriz primero.');
            return;
        }
        const n = matriz.length;
        let mat = JSON.parse(JSON.stringify(matriz));
        let inv = Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        );

        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) {
                    maxRow = k;
                }
            }

            [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
            [inv[i], inv[maxRow]] = [inv[maxRow], inv[i]];

            if (mat[i][i] === 0) {
                alert("La matriz no tiene inversa");
                return;
            }

            const pivot = mat[i][i];
            for (let j = 0; j < n; j++) {
                mat[i][j] /= pivot;
                inv[i][j] /= pivot;
            }

            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    const factor = mat[k][i];
                    for (let j = 0; j < n; j++) {
                        mat[k][j] -= factor * mat[i][j];
                        inv[k][j] -= factor * inv[i][j];
                    }
                }
            }
        }
        this.visualizarMatriz(inv, 'resultTable');
    }


    // Producto Escalar
    productoEscalar(matriz) {
        
        if (!matriz.length) {
            alert("Ingrese una matriz primero.")
            return;
        }

        const resultado = [];
        const Escalar = parseInt(document.getElementById(`escalarNUM`).value, 10);
        for (let i = 0; i < matriz.length; i++) {
            const fila = [];
            for (let j = 0; j < matriz[i].length; j++) {
                fila.push(matriz[i][j] * Escalar);
            }
            resultado.push(fila);
        }
    
        this.visualizarMatriz(resultado, 'resultTable');
    }

    // Transpuesta
    transponerMatriz(matriz) {
        // Verifica si la matriz está vacía
        if (!matriz.length) {
            alert("Ingrese una matriz primero.")
            return;
        }
        
        // Obtén el número de filas y columnas de la matriz original
        const filas = matriz.length;
        const columnas = matriz[0].length;
        
        // Inicializa una matriz vacía para almacenar la transpuesta
        let resultado = [];
        
        // Itera sobre las columnas de la matriz original
        for (let j = 0; j < columnas; j++) {
          // Inicializa una nueva fila en la matriz transpuesta
          resultado[j] = [];
          // Itera sobre las filas de la matriz original
          for (let i = 0; i < filas; i++) {
            // Copia el elemento de la matriz original a la posición correspondiente en la transpuesta
            resultado[j][i] = matriz[i][j];
        }
        }
        this.visualizarMatriz(resultado, 'resultTable');
    }
    
    divideRow(row, value) {
        return row.map(item => item / value)
    }
    
    multiplyRow(row, value) {
        return row.map(item => item * value)
    }
    
    addRows(row1, row2, invert1, invert2) {
        let row3 = []
    
        row3 = row1.map((item, i) => {
            return row1[i] * (invert1 ? -1 : 1) + row2[i] * (invert2 ? -1 : 1)
        })
    
        return row3
    }

    solveByGaussJordan(matriz, i = 0) {
        if (i == matriz.length) {
          return fixedPrecisionMatrix(matriz)
        }
    
        let m = [...matriz];
        let currentRow = m[i];
        let pivot = currentRow[i];
    
        m[i] = this.divideRow(currentRow, pivot)
        
        m = m.map((item, mapIndex) => {
        if (mapIndex == i) { // ignore already processed row
            return item
        } else {
            return this.addRows(this.multiplyRow(m[i], -item[i]), item)
        }
        })

        return this.solveByGaussJordan(m, i + 1);
    }
    
    
    visualizarMatrizIdentidad(matriz){
        if (!matriz.length) {
            alert("Ingrese una matriz primero.")
            return;
        }
        let solvedMatriz = this.solveByGaussJordan(matriz);
        if (!solvedMatriz[1][1]) {
            alert("La matriz no tiene matriz identidad. ");
            return;
        }
        this.visualizarMatriz(solvedMatriz, 'resultTable');
    }

    // Limpiar //
    limpiarMatrices() {
         
        if (this.matriz1.length === 0 && this.matriz2.length === 0 && escalarNUM == 0) {
            alert('No hay matrices por limpiar');
        } else {
            this.matriz1 = [];
            this.matriz2 = [];
            document.getElementById('matrixTable1').innerHTML = '';
            document.getElementById('matrixTable2').innerHTML = '';
            document.getElementById('resultTable').innerHTML = '';
    
            document.getElementById('filas1').value = '';
            document.getElementById('columnas1').value = '';
            document.getElementById('filas2').value = '';
            document.getElementById('columnas2').value = '';
            document.getElementById('escalarNUM').value = '';
    
            alert('Matrices limpiadas y campos reiniciados.');
        }
    }
}

const short = (n, decimals = 3) => {
    return Number(n.toFixed(decimals))
}

const fixedPrecisionMatrix = m => {
    return m.map(item => (
      [
        ...item.splice(0, item.length - 1),
        short(item[item.length - 1], 8)
      ]
    ))
}

const manejadorMatrices = new MatrizHandler();

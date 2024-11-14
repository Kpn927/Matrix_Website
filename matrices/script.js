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
        let matriz = [];

        if (!filas || !columnas) {
            alert("Ingresa los números para las dimensiones");
        }

        for (let i = 0; i < filas; i++) {
            let fila = prompt(`Introduce los elementos de la fila ${i + 1} para la matriz ${matrizNum}, separados por comas:`);
            // MAP y NUMBER convierte los números ingresados a números reales, en ejemplo 
            //["1","2","3"] A [1, 2, 3]
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

    // LIMPIAR // 

    limpiarMatrices() {

        if (this.matriz1.length === 0 && this.matriz2.length === 0) {
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

    // INVERSA //
    obtenerInversa(matriz) {

        if (this.matriz1.length === 0 && this.matriz2.length === 0) {
            alert('Por favor, ingresa una matriz primero.');
            return;
        }
        const n = matriz.length;
        //Realiza una copia exacta el array matriz.
        let mat = JSON.parse(JSON.stringify(matriz));
        // Se utiliza _ para ignorar el primer parametro del callback
        // Básicamente pregunta si I = J pone un 1 si no, pone un 0
        // y para cada fila i crea un array de longitud n, que n es la longitud de la matriz
        let inv = Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        );
        
        // acá lo que hace es encontrar el valor absoluto de más grande de la columna actual y la marca para ser intercambiada.
        for (let i = 0; i < n; i++) {   
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) {
                    maxRow = k;
                }
            }

            //Ocurre un intercambio de filas.
            [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
            [inv[i], inv[maxRow]] = [inv[maxRow], inv[i]];

            if (mat[i][i] === 0) {
                throw new Error("La matriz no tiene inversa");
            }

            //se inicializa el pivote y se divide por cada elemento de la fila
            const pivot = mat[i][i];
            for (let j = 0; j < n; j++) {
                mat[i][j] /= pivot;
                inv[i][j] /= pivot;
            }

            //Básicamente hace que todos los elementos de la columna i excepto el pivote sean 0
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    //se obtiene el valor que se busca eliminar de la columna i de la fila k 
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

    // Transpuesta
    transponerMatriz(matriz) {
        // Verifica si la matriz está vacía
        if (!matriz.length) {
            prompt("Ingrese una matriz primero.")
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
    
    // Este método divide cada elemento de la fila row por un valor value.
    divideRow(row, value) {
        return row.map(item => item / value)
    }

    // Lo mismo que el de arriba solo que con un *
    multiplyRow(row, value) {
        return row.map(item => item * value)
    }

    // Este método suma dos filas row1 y row2. Opcionalmente, puede invertir (cambiar el signo) de los elementos de cada fila antes de sumarlos.
    // invert1 ? -1 : 1 y invert2 ? -1 : 1: Estas expresiones determinan si se debe invertir (multiplicar por -1) los elementos de row1 y row2 respectivamente.
    addRows(row1, row2, invert1, invert2) {
        let row3 = []
    
        row3 = row1.map((item, i) => {
          return row1[i] * (invert1 ? -1 : 1) + row2[i] * (invert2 ? -1 : 1)
        })
    
        return row3
    }

    GaussJordan(matrix, i = 0) {
        // Verifica si i (el índice actual de la fila) es igual a la longitud de la matriz.
        if (i == matrix.length) {
          return fixedPrecisionMatrix(matrix)
        }
        
        // Creamos una copia de la matriz.
        let m = [...matrix];
        // Selecciona la fila actual currentRow y el elemento pivote pivot, que es el elemento en la posición [i][i].
        let currentRow = m[i];
        let pivot = currentRow[i];
        
        // Normaliza la fila actual dividiéndola por el pivote, de modo que el pivote se convierta en 1.
        m[i] = this.divideRow(currentRow, pivot)
        
        // Si la fila es la actual (mapIndex == i): La deja sin cambios.
        //Si la fila no es la actual La actualiza restando un múltiplo de la fila pivote para hacer que los elementos en la columna i sean cero.

        m = m.map((item, mapIndex) => {
          if (mapIndex == i) {
            return item
          } else {
            return this.addRows(this.multiplyRow(m[i], -item[i]), item)
          }
        })
        return this.GaussJordan(m, i + 1);
    }
    
    // Funcion para ver la matriz resuelta no mas
    visualizarMatrizIdentidad(matrix){
        let solvedMatrix = this.GaussJordan(matrix);
        this.visualizarMatriz(solvedMatrix, 'resultTable');
    }
      

}
// Esta función toma un número n y lo convierte en un número con una cantidad fija de decimales, luego lo retorna como un número en vez de una cadena.
const short = (n, decimals = 3) => {
    return Number(n.toFixed(decimals))
}

// Esta función toma una matriz m y redondea el último elemento de cada fila a 8 decimales.
const fixedPrecisionMatrix = m => {
    //aplica la función a cada array de la matriz.
    return m.map(item => (
      [
        //remueve todos los elementos de la fila excepto el ultimo 
        ...item.splice(0, item.length - 1),
        //Rendondea el úlitmo a 8 decimales.
        short(item[item.length - 1], 8)
        //... pasa todo los elementos removidos y el elemento redondeado a una nueva fila.
      ]
    ))
}

const manejadorMatrices = new MatrizHandler();

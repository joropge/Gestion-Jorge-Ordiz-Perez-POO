
export class LocalStorage {
    // Método para obtener datos del localStorage
    static getData(key) {
        const data = localStorage.getItem(key); //obtenemos los datos del localStorage
        return data ? JSON.parse(data) : []; //si hay datos, los parseamos, si no, devolvemos un array vacío
    }
 
    // Método para guardar datos en el localStorage
    static setData(key, data) {   
 
        localStorage.setItem(key, JSON.stringify(data)); //guardamos los datos en el localStorage
 
    }

}

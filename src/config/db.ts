import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const dbUri = "mongodb://localhost:27017/90minutos_Analisis"; 
        await mongoose.connect(dbUri);
        console.log("Conexion exitosa a la base de datos");
    } catch (error) {
        console.error("Ocurrio un error al conectar con MongoDB:", error);
    }
};

export default connectDatabase;
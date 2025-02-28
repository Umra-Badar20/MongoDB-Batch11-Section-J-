import mongoose from 'mongoose';

const url =`mongodb+srv://jannatfaisal:<db_password>@jannatcluster.bowd9.mongodb.net/?retryWrites=true&w=majority&appName=JannatCluster`

mongoose.connect(url)
export default mongoose;


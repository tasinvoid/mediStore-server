import { app } from "./app";
import { prisma } from "./lib/prisma";

async function main() {
    const port = process.env.PORT
    try {
        await prisma.$connect()
        console.log("Connected to DB successfully");
        app.get('/', (req,res) => {
            res.send("server is running");
        })
        app.listen(port,() => {
            console.log(`mediStore server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        process.exit(1)
    }
}
main()
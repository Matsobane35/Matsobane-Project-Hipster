import Fastify from "fastify"
import pg from "pg";
import fastifyCors from "@fastify/cors";
import pool from "./db/database.js";

const fastify = Fastify({logger: true})
const PORT = 8080

await fastify.register(fastifyCors, {
    origin: ["http://localhost:5173", `http://localhost:${PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

fastify.get("/brews", async (request, reply) => {
    const result = await pool.query("SELECT * FROM brews")
    return result.rows
})

fastify.post("/brews/:coffee_id", async (request, reply) => {
    const {id, beans, method, coffeeGrams, waterGrams, rating, tastingNotes} = request.body
    const values = [id, beans, method, coffeeGrams, waterGrams, rating, tastingNotes]
    const result = await pool.query(
        `INSERT INTO brews(coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes)
         VALUES($1, $2, $3, $4, $5, $6, $7)`, values)
})

fastify.delete("/brews/:coffee_id", async (request, reply) => {
    const id = request.body
    const result = await pool.query(
        `DELETE FROM brews WHERE coffee_id = ${id}`)
})

fastify.put("/brews/:coffee_id", async (request, reply) => {
    const {id, beans, method, coffeeGrams, waterGrams, rating, tastingNotes} = request.body
    const values = [id, beans, method, coffeeGrams, waterGrams, rating, tastingNotes]
    const result = await pool.query(
        `UPDATE brews SET 
        coffee_id = $1, 
        beans_used = $2, 
        brewing_method = $3, 
        coffee_content = $4, 
        water_content = $5, 
        preference_rating = $6, 
        tasting_notes = $7
        WHERE coffee_id = $1`, values)
})

const startServer = async () => {
    try {
        await fastify.listen({port: PORT})
        console.log("Backend server started successfully!")
    }
    catch (err) {
        console.error(`Backend failed to start: ${err}`)
        process.exit(1)
    }
}
startServer()

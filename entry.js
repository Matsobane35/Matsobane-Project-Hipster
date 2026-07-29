import Fastify from "fastify"
import pg from "pg";
import fastifyCors from "@fastify/cors";
import pool from "./db/database.js";

const fastify = Fastify({logger: true})
const PORT = 8080

await fastify.register(fastifyCors, {
    origin: ["http://localhost:5173", "http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

fastify.get("/count", async () => {
    const result = await pool.query("SELECT COUNT(*) FROM brews")
    return result.rows
})

fastify.get("/brews", async (req, res) => {
    const result = await pool.query("SELECT * FROM brews")
    return result.rows
})

fastify.post("/brews/coffee_id", async (request, response) => {
    const {coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes} = request.body
    const values = [coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes]
    await pool.query(
        `INSERT INTO brews(coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes)
         VALUES($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`
    , values)
    response.code(201).send(rows[0])
})

fastify.delete("/brews/coffee_id", async (request, response) => {
    const {id} = request.params
    const values = [id]
    const result = await pool.query(
        `DELETE FROM brews WHERE coffee_id = $1 RETURNING *`
    , values)
    response.code(200).send({
        message: "Coffee deleted successfully",
        coffee: rows[0]
    })
})

fastify.put("/brews/coffee_id", async (request, response) => {
    const {edited_id} = request.params
    const {coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes} = request.body
    const values = [coffee_id, beans_used, brewing_method, coffee_content, water_content, preference_rating, tasting_notes]
    const {rows} = await pool.query(
        `UPDATE brews 
        SET beans_used = $2, brewing_method = $3, coffee_content = $4, water_content = $5, preference_rating = $6, tasting_notes = $7
        WHERE coffee_id = $1
        RETURNING *`
    , values)
    response.send(rows[0])
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
import 'dotenv/config'

const envVar = ['PORT', 'MONGODB_URI']

envVar.forEach((env) => {
    if (!process.env[env]) {
        throw new Error(`Missing environment variable: ${env}`)
    }
})

const CONFIG = {}
envVar.forEach((env) => {
    CONFIG[env] = process.env[env]
})

export default CONFIG

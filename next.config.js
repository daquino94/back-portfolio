/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*", // Cambia questo per corrispondere alla tua struttura di routing
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // Consenti tutte le origini
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS, PUT, DELETE" }, // Metodi consentiti
                    { key: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept" }, // Intestazioni consentite
                    { key: "Access-Control-Allow-Credentials", value: "true" }, // Consenti i cookie nelle richieste
                ],
            },
        ];
    },
}

module.exports = nextConfig

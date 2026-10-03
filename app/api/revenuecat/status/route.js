export async function GET(){
 return Response.json({webhook:"/api/revenuecat/webhook",authConfigured:Boolean(process.env.REVENUECAT_WEBHOOK_AUTH),apiConfigured:Boolean(process.env.REVENUECAT_SECRET_API_KEY),projectConfigured:Boolean(process.env.REVENUECAT_PROJECT_ID),note:"Secrets are read server-side only."});
}
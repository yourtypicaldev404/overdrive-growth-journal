export async function POST(request){
  const expected=process.env.REVENUECAT_WEBHOOK_AUTH;
  if(!expected) return Response.json({error:"Webhook auth not configured"},{status:503});
  if(request.headers.get("authorization")!==expected) return Response.json({error:"Unauthorized"},{status:401});
  const payload=await request.json();
  const e=payload?.event;
  if(!e?.id||!e?.type) return Response.json({error:"Invalid RevenueCat payload"},{status:400});
  // This endpoint is ready for RevenueCat. Persistent event storage is added once a DB is attached.
  console.log(JSON.stringify({source:"revenuecat",id:e.id,type:e.type,app_user_id:e.app_user_id,product_id:e.product_id,country:e.country_code,environment:e.environment,price:e.price,currency:e.currency,at:e.event_timestamp_ms||Date.now()}));
  return Response.json({ok:true,event_id:e.id,type:e.type});
}
export async function GET(){return Response.json({ok:true,service:"Overdrive RevenueCat webhook",configured:Boolean(process.env.REVENUECAT_WEBHOOK_AUTH)});}
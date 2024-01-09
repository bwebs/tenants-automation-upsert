const { CourierClient } = require("@trycourier/courier");
require('dotenv').config()
const { upsertTenant } = require('./upsertTenant')

const PROPERTIES = ['last_invitation_sent', 'last_build']

const courier = new CourierClient()
const invokeAutomation = async (template_id, tenant_id, emails) => {
    const upsert = await upsertTenant(
        tenant_id, 
        PROPERTIES.reduce((acc, p) => {
            acc[p] = 0;
            return acc
        }, {})
    )
    const run = await courier.automations.invokeAutomationTemplate(template_id, {
        profile: emails.map(e=>({
            email: e
        })),
        data: {
            tenant_id
        }
    })
    console.log(run)
}

const [template_id, tenant_id, ...emails] = process.argv.slice(2);
if (emails.length > 0) {
    invokeAutomation(template_id, tenant_id, emails)
} else {
    throw new Error("No emails provided")
}
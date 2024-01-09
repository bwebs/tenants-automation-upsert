const { CourierClient } = require("@trycourier/courier");
require('dotenv').config()
const omit = require('lodash/omit')
const courier = new CourierClient()

const upsertTenant = async (tenant_id, new_properties) => {
    const tenant = await courier.tenants.get(tenant_id);
    if (tenant) {
        courier.tenants.createOrReplace(tenant_id, {
            ...omit(tenant, ['created_at', 'updated_at']),
            properties: {
                ...tenant.properties,
                ...new_properties
            },
            default_preferences: (tenant.default_preferences.items) ? {
                ...tenant.default_preferences
            } : undefined
        })
    } else {
        courier.tenants.create(tenant_id, {
            name: tenant_id,
            properties: new_properties
        })
    }
}

const [tenant_id, ...var_map] = process.argv.slice(2);
let new_properties = var_map.reduce((acc,v,k)=>{
    if (k % 2 === 0) {
        acc[v] = isNaN(var_map[k+1]) ? var_map[k+1] : Number(var_map[k+1])
    }
    return acc
}, {})
if (Object.keys(new_properties).length > 0) {
    console.log({new_properties})
    upsertTenant(tenant_id, new_properties);
} else {
    throw new Error("No properties provided")
}

module.export = {
    upsertTenant
}
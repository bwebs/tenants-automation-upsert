# start the flow for a tenant

yarn invoke <template_id> <tenant_id> <email> <email> ...<email>

```
yarn invoke 02caa529-61b2-4a66-b819-3a052fb4b543 abc foo@bar.com hello@world.com
```

# upsert a tenant

yarn upsert <tenant_id> <key1> <value1> <key2> <value2> ...<keyN> <valueN>

```
yarn upsert abc last_invitation_sent 1234567 last_build 1234567
```
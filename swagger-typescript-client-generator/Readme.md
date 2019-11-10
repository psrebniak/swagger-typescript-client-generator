# THIS IS DEV BRANCH FOR FUTURE RELEASE v2.0.0 AND MAY NOT WORK

## Please always use master branch

# swagger-typescript-client-generator

Generate typescript client/models from swagger.json file

## install

```
npm install --global swagger-typescript-client-generator
```

## generate separate files for models and client

```
$ swagger-typescript-client-generator models -f swagger.json > models.ts
$ swagger-typescript-client-generator client MyApi "./models.ts" -f swagger.json > client.ts
```

## generate one file for both models and client

```
$ swagger-typescript-client-generator bundle MyApi -f swagger.json > client.ts
```

## commands

- `models` - generate only models
- `client <name> [importFromFile]` - generate client with given `name` and import models from optional parameter `[importFromFile]` (default `"./model"`)
- `bundle <name>` - generate models and client in single run

## parameters

- `--file, -f` - input file swagger.json
- `-allowVoidParameterTypes, -a` - generate parameter types (query, body, formData, headers) for `void` values.
  Can apply to both models and client (see #)

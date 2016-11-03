# Alberti Ring
An access mechanism (custom authorizer) to secrets backed by [alberti](https://github.com/ocelotconsulting/alberti), exposed via AWS API Gateway.

## Status
Under development (11-3-2016)

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/alberti-ring.git

2. Package lambda zip:

        $ npm run dist

3. Create lambda by uploading zip, and establish your desired trigger

**Disclaimer** - This is intended to be triggered by an API Gateway event, so choosing "API Gateway Authorizer" event template from the Lambda testing tool will yield the best result at the moment.

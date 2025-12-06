pm.globals.set("restHelpers", `
function checkStatusCode(response, expectedStatus) {
    if(response.code !== expectedStatus) {
        throw new Error('Expected status: ' + expectedStatus + ' but got ' + response.code);
    }
}

function checkResponseTime(response, maxResponseTime) {
    if(response.responseTime > maxResponseTime) {
        throw new Error('Expected response time <= ' + maxResponseTime + ' but got ' + response.responseTime);
    }
}

function checkRequiredKeys(data, keys) {
    if (Array.isArray(data)) {
        const missingItems = data.filter(item => keys.some(k => !(k in item)));
        if (missingItems.length > 0) {
            pm.expect.fail('Some objects in array are missing keys: ' + JSON.stringify(missingItems));
        }
    } else if (typeof data === "object" && data !== null) {
        const missingKeys = keys.filter(k => !(k in data));
        if (missingKeys.length > 0) {
            pm.expect.fail('Object is missing keys: ' + missingKeys.join(', '));
        }
    } else {
        pm.expect.fail("Data is neither object nor array of objects");
    }
}
`);
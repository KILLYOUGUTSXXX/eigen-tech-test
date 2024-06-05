#!/bin/sh
export NEST_ENV=test;
npm run migrate:refresh;
npm run test;
npm run drop:db;
  
failed_test=$(cat jest-result | jq -r .numFailedTests);
echo "Failed Test Totals : ${failed_test}";

if [[ $(($failed_test)) -gt 0 ]]; then
  echo -e '\e[31mService is not running, because the test is failure.'
else
  export NEST_ENV=prod;
  npm run migrate:refresh;
  npm run build;
  npm run start:prod;
fi;
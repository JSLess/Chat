
clear


set -a
source .github/.env
set +a


deno run            \
    --unstable-kv   \
    --watch         \
    -A              \
    Source/App.ts

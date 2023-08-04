

set -a
source .github/.env
set +a


deno run \
    --unstable \
    --watch \
    -A \
    Source/App.ts

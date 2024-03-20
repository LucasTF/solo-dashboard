#!/bin/bash

# Check if tmux package is installed
if ! command -v tmux &> /dev/null
then
    echo "tmux not installed."
    exit 1
fi

SESSION="soloapp"
SKIP_BUILD_STEP=false
COMMAND=""

# Check if "--no-build" flag is present
while [[ $# -gt 0 ]]; do
    case "$1" in
        -nb | --no-build)
            SKIP_BUILD_STEP=true
        ;;
        *)
            echo "ERROR! Unknown flag"
            exit 2
        ;;
    esac
    shift
done

if [ "$SKIP_BUILD_STEP" = true ];
then
    COMMAND='npm run start'
else
    COMMAND='npm run build && npm run start'
fi

# Create new tmux session
tmux new-session -d -s "$SESSION"

# Send command to tmux session
tmux send-keys -t "$SESSION" "$COMMAND" Enter

echo "tmux session created as $SESSION"
echo "Enter session by typing 'tmux attach -t $SESSION'"

exit 0
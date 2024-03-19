#!/bin/bash

if ! command -v tmux &> /dev/null
then
    echo "tmux not installed."
    exit 1
fi

session="soloapp"

tmux new-session -d -s "$session"
tmux send-keys -t "$session" 'npm run build && npm run start' Enter

echo "tmux session created as $session"
echo "Enter session by typing 'tmux attach -t $session'"
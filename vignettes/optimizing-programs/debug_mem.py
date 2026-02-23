import os
import subprocess

def get_process_tree_rss():
    try:
        ppid = os.getpid()
        cmd = ["ps", "-Ax", "-o", "ppid,pid,rss"]
        output = subprocess.check_output(cmd).decode('utf-8')
        lines = output.strip().split('\n')[1:]
        
        processes = []
        for line in lines:
            parts = line.split()
            if len(parts) >= 3:
                try:
                    processes.append({
                        'ppid': int(parts[0]),
                        'pid': int(parts[1]),
                        'rss': int(parts[2])
                    })
                except ValueError:
                    continue
        
        to_examine = [ppid]
        descendants = set()
        total_rss = 0
        
        # Add self first
        self_found = False
        for p in processes:
            if p['pid'] == ppid:
                total_rss += p['rss']
                self_found = True
                break

        print(f"Self PID: {ppid}, Self RSS found: {self_found}, Initial Total RSS: {total_rss}")

        while to_examine:
            parent = to_examine.pop()
            for p in processes:
                if p['ppid'] == parent and p['pid'] not in descendants:
                    descendants.add(p['pid'])
                    total_rss += p['rss']
                    to_examine.append(p['pid'])
                    print(f"Adding descendant: {p['pid']}, RSS: {p['rss']}, Cumulative: {total_rss}")
        
        return total_rss * 1024
    except Exception as e:
        print(f"Error: {e}")
        return 0

print(f"Final RSS: {get_process_tree_rss() / 10**6} MB")

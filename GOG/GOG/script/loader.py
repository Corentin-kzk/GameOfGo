import sys
import time
import threading


class Loader:
    def __init__(self, delay=0.1, label='Loading', ending_label='Loading complete !'):
        self.delay = delay
        self.running = False
        self.animation = ["|", "/", "-", "\\"]
        self.idx = 0
        self.thread = threading.Thread(target=self._animate)
        self.label = label
        self.ending_label = ending_label

    def _animate(self):
        while self.running:
            sys.stdout.write(f"\r{self.label} {self.animation[self.idx]} \n")
            sys.stdout.flush()
            self.idx = (self.idx + 1) % len(self.animation)
            time.sleep(self.delay)
        sys.stdout.write(f"\r{self.ending_label} \n")

    def start(self):
        self.running = True
        self.thread.start()

    def stop(self):
        self.running = False
        self.thread.join()

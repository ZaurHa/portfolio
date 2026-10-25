# /tmp/og.png -> public/og.jpg (JPEG, weil WhatsApp und LinkedIn WebP nicht überall zeigen)
from PIL import Image
import os
Image.open("/tmp/og.png").convert("RGB").save("public/og.jpg", "JPEG", quality=86, optimize=True, progressive=True)
print("public/og.jpg", os.path.getsize("public/og.jpg") // 1024, "KB")

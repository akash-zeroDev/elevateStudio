import os
import sys

print("Installing dependencies...")
os.system(f"{sys.executable} -m pip install rembg Pillow --quiet")

try:
    from rembg import remove
    from PIL import Image, ImageOps

    input_path = "src/assets/founder.png"
    output_path = "src/assets/founder.png"

    print("Opening image...")
    input_image = Image.open(input_path)
    
    print("Removing background...")
    subject = remove(input_image)
    
    print("Creating black background...")
    background = Image.new("RGB", subject.size, (0, 0, 0))
    
    # The mask ensures we only paste the subject where alpha > 0
    background.paste(subject, mask=subject)
    
    print("Flipping image horizontally...")
    final_image = ImageOps.mirror(background)
    
    print("Saving image...")
    final_image.save(output_path)
    print("Done!")
except ImportError as e:
    print("Failed to import modules:", e)
except Exception as e:
    print(f"Error: {e}")

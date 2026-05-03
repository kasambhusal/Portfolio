import os
from PIL import Image

input_folder = "institutions"
output_folder = "institutions2"

# Target sizes
sizes = [84, 168, 336]

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith(".webp"):
        filepath = os.path.join(input_folder, filename)
        
        with Image.open(filepath) as img:
            for size in sizes:
                img_copy = img.copy()
                
                # Keep aspect ratio
                img_copy.thumbnail((size, size))
                
                name = os.path.splitext(filename)[0]
                new_filename = f"{name}-{size}.webp"
                save_path = os.path.join(output_folder, new_filename)
                
                img_copy.save(save_path, "WEBP", quality=80, method=6)

print("✅ All WebP images resized!")
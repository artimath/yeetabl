import csv
import itertools
from pathlib import Path

# List of product names
products = [
    "Sentra AM", "Sentra PM", "AppTrim-D", "GABAdone", "Trepadone",
    "Theramine", "AppTrim", "Percura", "Clearwayz", "Hypertensa Advanced"
]

# Dictionary to store headlines for each product
products_headlines = {
    "Sentra AM": [
        "5 Natural Ways to Boost Your Mental Energy",
        "Understanding the Link Between Diet and Cognitive Function",
        "The Science Behind Mental Fatigue: What You Need to Know",
        "Nutrition Strategies for Enhancing Brain Performance",
        "Combating Brain Fog: Tips from Neuroscience Experts",
        "How Your Gut Health Affects Your Cognitive Abilities",
        "The Role of Micronutrients in Mental Clarity and Focus",
        "Unlocking Your Brain's Potential: Dietary Approaches to Cognitive Enhancement",
        "Fatigue-Fighting Foods: Eat Your Way to Better Mental Energy",
        "The Mind-Body Connection: How Physical Health Impacts Cognitive Function"
    ],
    "Sentra PM": [
        "The Secrets of Restorative Sleep: A Comprehensive Guide",
        "Nutritional Approaches to Improving Sleep Quality",
        "Understanding Sleep Cycles: How to Optimize Your Rest",
        "The Role of Diet in Regulating Circadian Rhythms",
        "Natural Remedies for Common Sleep Disturbances",
        "How Your Bedtime Snack Affects Your Sleep Quality",
        "The Science of Sleep: Nutrients That Support Healthy Rest",
        "Lifestyle Changes for Better Sleep: Beyond Counting Sheep",
        "Maximizing Your Sleep Efficiency: Tips from Sleep Experts",
        "The Connection Between Stress, Nutrition, and Sleep"
    ],
    "AppTrim-D": [
        "Sustainable Weight Management: Beyond Calorie Counting",
        "The Role of Metabolism in Weight Control: What You Should Know",
        "Navigating Weight Loss Without Caffeine: Effective Strategies",
        "Understanding Satiety: How to Feel Fuller for Longer",
        "Balancing Hormones for Healthy Weight Management",
        "The Gut-Brain Axis: Its Impact on Weight and Appetite",
        "Nutrition Strategies for Long-Term Weight Maintenance",
        "Breaking the Yo-Yo Diet Cycle: Sustainable Approaches to Weight Loss",
        "The Science of Fat Burning: Optimizing Your Body's Natural Processes",
        "Mindful Eating: A Key to Successful Weight Management"
    ],
    "GABAdone": [
        "The Anxiety-Sleep Connection: Breaking the Cycle",
        "Natural Ways to Calm Your Mind for Better Sleep",
        "Understanding GABA: The Brain's Natural Calming Agent",
        "Nutritional Approaches to Managing Stress-Related Sleep Issues",
        "The Science of Relaxation: Preparing Your Body for Rest",
        "Balancing Neurotransmitters for Better Sleep and Mood",
        "Holistic Strategies for Addressing Anxiety-Induced Insomnia",
        "The Role of Diet in Managing Nighttime Anxiety",
        "Mindfulness Techniques for Calming Pre-Sleep Anxiety",
        "Understanding the Sleep-Stress Cycle: Breaking Free for Better Rest"
    ],
    "Trepadone": [
        "Natural Anti-Inflammatory Approaches for Joint Health",
        "Understanding the Root Causes of Joint Discomfort",
        "Nutrition Strategies for Supporting Healthy Joints",
        "The Role of Collagen in Joint Flexibility and Comfort",
        "Balancing Inflammation: Key to Joint Health and Mobility",
        "Exercise and Joint Health: Finding the Right Balance",
        "The Gut-Joint Connection: How Diet Affects Joint Comfort",
        "Holistic Approaches to Managing Joint Discomfort",
        "Understanding Oxidative Stress and Its Impact on Joints",
        "Micronutrients for Joint Health: Beyond Calcium and Vitamin D"
    ],
    "Theramine": [
        "The Science of Pain: Understanding Your Body's Alarm System",
        "Nutritional Approaches to Managing Chronic Discomfort",
        "Inflammation and Pain: Breaking the Cycle Naturally",
        "The Role of Amino Acids in Pain Management",
        "Dietary Strategies for Supporting Your Body's Natural Pain Relief",
        "Understanding Central Sensitization in Chronic Pain",
        "The Gut-Brain Axis: Its Role in Pain Perception",
        "Balancing Neurotransmitters for Pain Management",
        "Holistic Approaches to Reducing Inflammation in the Body",
        "The Connection Between Stress, Nutrition, and Pain Levels"
    ],
    "AppTrim": [
        "Understanding Metabolic Health: Beyond the Scale",
        "The Science of Appetite Control: Natural Approaches",
        "Balancing Blood Sugar for Effective Weight Management",
        "Stress and Weight Gain: Breaking the Cycle",
        "The Role of Sleep in Successful Weight Management",
        "Nutrition Strategies for Boosting Your Metabolism",
        "Understanding Leptin Resistance and Its Impact on Weight",
        "The Psychology of Eating: Mindful Approaches to Weight Loss",
        "Inflammatory Foods and Their Impact on Weight Management",
        "Optimizing Gut Health for Sustainable Weight Loss"
    ],
    "Percura": [
        "Understanding Peripheral Neuropathy: Causes and Effects",
        "Nutritional Strategies for Supporting Nerve Health",
        "The Role of B Vitamins in Maintaining Healthy Nerves",
        "Managing Neuropathic Discomfort: A Holistic Approach",
        "Antioxidants and Nerve Health: What You Need to Know",
        "The Connection Between Blood Sugar and Nerve Function",
        "Exercise and Peripheral Neuropathy: Finding the Right Balance",
        "Understanding Mitochondrial Health in Nerve Function",
        "The Impact of Inflammation on Peripheral Nerves",
        "Dietary Approaches to Supporting Healthy Nerve Conduction"
    ],
    "Clearwayz": [
        "Breathing Easy: Natural Approaches to Sinus Health",
        "Understanding the Microbiome of Your Respiratory System",
        "The Role of Diet in Supporting Healthy Sinuses",
        "Navigating Seasonal Challenges: Tips for Respiratory Wellness",
        "The Connection Between Gut Health and Respiratory Function",
        "Natural Ways to Support Mucus Membrane Health",
        "Understanding Histamines and Their Impact on Sinus Comfort",
        "The Importance of Hydration for Respiratory Health",
        "Herbs and Spices That Support Clear Breathing",
        "Air Quality and Respiratory Health: What You Need to Know"
    ],
    "Hypertensa Advanced": [
        "Understanding Blood Pressure: Beyond the Numbers",
        "The DASH Diet: A Nutritional Approach to Heart Health",
        "Stress Management Techniques for Cardiovascular Wellness",
        "The Role of Potassium in Maintaining Healthy Blood Pressure",
        "Exercise and Blood Pressure: Finding the Right Balance",
        "Understanding Nitric Oxide and Its Impact on Vascular Health",
        "The Gut-Heart Connection: How Diet Affects Blood Pressure",
        "Natural Approaches to Supporting Healthy Arterial Function",
        "The Impact of Sleep on Cardiovascular Health",
        "Mindfulness and Meditation: Tools for Heart Health"
    ]
}

def generate_csv(num_images, output_file):
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Image', 'Headline', 'Product'])

        image_names = [f"image_{i}.jpg" for i in range(1, num_images + 1)]
        
        for image_name, (product, headline) in itertools.product(image_names, 
                                                                 [(p, h) for p, headlines in products_headlines.items() for h in headlines]):
            writer.writerow([image_name, headline, product])

    print(f"CSV file '{output_file}' has been generated successfully.")

# Usage
num_images = 5  # Change this to the number of images you have
output_file = 'product_headlines_all_combos.csv'
generate_csv(num_images, output_file)
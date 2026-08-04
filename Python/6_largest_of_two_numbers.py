first_number = int(input("Enter first number: "))
second_number = int(input("Enter second number: "))

if first_number > second_number:
    print("Largest number is", first_number)
elif second_number > first_number:
    print("Largest number is", second_number)
else:
    print("Both numbers are equal")
from textblob import TextBlob

def corrigir_palavra(palavra):
    blob = TextBlob(palavra)
    return str(blob.correct())

# Exemplo de uso
entrada = "corrreção"
correta = corrigir_palavra(entrada)
print(f"Palavra corrigida: {correta}")